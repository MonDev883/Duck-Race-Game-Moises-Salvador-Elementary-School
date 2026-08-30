# 🦆 Duck Race Game

A browser game built for kindergarten pupils at **Moises Salvador Elementary
School**. Children's names are entered, their ducks race across the water, and
the winner answers a question in front of the class.

No install, no accounts, no internet needed after the first load — it runs from
a single folder on whatever computer the classroom has.

**Play:** https://mondev883.github.io/Duck-Race-Game-Moises-Salvador-Elementary-School/

---

## 📸 Screenshots

| Setup | Race in progress |
|---|---|
| ![Adding students](docs/setup.png) | ![Race](docs/race.png) |

| Winner and question | Celebration |
|---|---|
| ![Question](docs/question.png) | ![Confetti](docs/celebration.png) |

---

## How it plays

1. The teacher types each child's name and adds them to the list
2. Everyone gets a duck, a coloured lane and a name label
3. **Start Race** — ducks move across the water, quacking and flashing as they go
4. The first duck to reach the dock wins
5. The winner is asked a question — counting, colours, shapes, or animal sounds
6. Confetti, a rainbow and a victory sound

### The three buttons

| Button | Clears the track | Clears the names |
|---|---|---|
| **Start Race** | resets, then races | keeps |
| **Race Again** | yes | keeps |
| **Clear All** | yes | yes (with confirmation) |

**Race Again** is for racing the same class repeatedly — twenty names typed one
at a time shouldn't be lost between rounds. **Clear All** is for starting with a
different group, and asks first.

Names can be edited or removed before the race starts, so a typo doesn't mean
starting over.

---

## Why the race is random

This is the decision the whole game rests on.

Each duck advances by a random amount every tick:

```js
positions[i] += 2 + Math.random() * 4;
```

The race isn't a test. It doesn't reward the fastest reader or the child who
already knows their numbers. Every pupil has the same chance of winning, which
means the quiet ones win as often as the confident ones.

**The question comes after the race, not during it.** It's the winner's prize —
a moment in front of the class — rather than an obstacle that decides the
outcome. A child who answers wrong still won the race.

For five- and six-year-olds, that difference matters. A game where the same
three children always win teaches the rest that they're not good at it.

---

## Built for a classroom screen

The teacher sits at the keyboard. The children watch from across the room. Those
are two very different viewing distances, and the layout accounts for both.

Anything the class reads scales with the screen:

```css
.nameLabel { font-size: clamp(16px, 1.6vw, 32px); }
.duck      { font-size: clamp(40px, 4.5vw, 90px); }
```

`clamp()` takes a minimum, a preferred value and a maximum. `1.6vw` is 1.6% of
the viewport width, so text grows on a projector and stays legible on a laptop —
without three separate media queries.

Lane height scales too, from the JavaScript, because the race loop needs the same
number the CSS uses:

```js
const rowHeight = window.innerWidth >= 1600 ? 130
                : window.innerWidth >= 1200 ? 100
                : 70;
```

Keeping that value in one place means the lanes and the ducks can't drift out of
alignment.

Controls stay small. Only what the class reads gets bigger.

---

## Questions the teacher can edit

Around forty questions ship with the game, grouped by what they practise:

| Group | Examples |
|---|---|
| Simple addition | `1 + 1`, `3 + 2`, `5 + 2` |
| Counting | How many fingers on one hand? Days in a week? |
| Body parts | How many eyes, ears, noses do you have? |
| Colours | What colour is the sky, a banana, grass? |
| Animal sounds | What sound does a duck, cow, pig make? |
| Number sequence | What comes after 4? |
| Shapes | What shape has 3 sides? |
| Local | How many letters are in the Filipino alphabet? |

**Manage questions** lets a teacher add their own without touching the code.
Added questions are stored in `localStorage`, so they survive a reload and the
next day's lesson. **Restore defaults** brings back the original set.

### Accepting more than one answer

A question can accept several answers, because there's more than one way a
five-year-old might say it:

```js
{
  q: "What is the name of your beautiful teacher?",
  a: ["grace", "ms grace", "teacher grace"]
}
```

`checkAnswer` handles both shapes — a single string or an array:

```js
const isCorrect = Array.isArray(correctAnswer)
    ? correctAnswer.includes(answer)
    : answer === correctAnswer.toLowerCase();
```

Answers are lowercased and trimmed before comparison, so capitalisation and
stray spaces don't count against a child still learning to type.

**A wrong answer keeps the question open.** The box stays, the field clears, and
the cursor returns — so "try again" is actually true rather than a message
followed by the box closing.

---

## Built with

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies.

That was deliberate. The school computer runs whatever it runs, and a game
that's one folder of files will still work in five years without an
`npm install`.

**Techniques used:**

- `setInterval` driving the race loop at 100ms, with the interval ID held at
  module scope so a race in progress can actually be stopped
- DOM elements created and positioned per racer, so the number of lanes matches
  the number of children
- `createElement` rather than `innerHTML` for names — a child called `Ma"am` or
  `O'Brien` is stored as text, not parsed as markup
- CSS transitions for the duck's scale and glow on each quack
- `localStorage` for teacher-added questions
- `prefers-reduced-motion` respected, since some children are sensitive to
  constant movement

---

## Running it

Download or clone, then open `index.html`. That's the whole setup.

```bash
git clone https://github.com/MonDev883/Duck-Race-Game-Moises-Salvador-Elementary-School.git
```

**A note on sound:** browsers block audio until the user interacts with the page,
so the first quack only plays after the teacher clicks Start. `.play()` returns a
promise that rejects if the browser refuses — those rejections are caught, so a
blocked sound never stops the race.

---

## Known limitations

Being honest about what I'd add next:

- **No score history.** Each race is independent, so the teacher can't see
  whether the same child keeps winning across a session.
- **One question per race.** The winner answers once. A "next question" button
  would let the teacher keep going with the same child.
- **No sound toggle.** A classroom that needs quiet has to mute the machine.

---

## Why I built it

I wanted to make something for a specific room of specific children rather than
for a portfolio. The constraints were real: it had to run on a school computer,
work without internet, be operable by a teacher who wasn't going to read
instructions, and hold the attention of five-year-olds.

Most of the design decisions above came from those constraints rather than from
anything I'd read about game design.

---

## License

MIT
