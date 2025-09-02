import { BlueHighlight, GreenHighlight } from '@site/src/components/Highlight';
import Quiz from '@site/src/components/Quiz';

# Interactivity

## Highlights

A key feature of Docusaurus is the support for `.mdx` files to make possible custom text highlights and React components. For improved highlighting in notes, simply use the import for `BlueHighlight` and `GreenHighlight` and use them in markdown. The convention for the notebook is to have `BlueHighlight` for key terms and `GreenHighlight` to call attention to details or parts of sentences that are important to understanding.

Here is a <BlueHighlight>key term</BlueHighlight> and here is <GreenHighlight>something that helps with understanding the concept</GreenHighlight>.

## Quizzes

With MDX you can generate a single reusable `<Quiz>` component that handles multiple questions in a compact and interactive way. You can then prompt the LLM:

```text
Generate 5 multiple-choice questions at the end of the following notes using the Quiz component.
```

## Dynamic Programming Notes

Dynamic programming solves problems by breaking them into overlapping subproblems...

<Quiz
  questions={[
    {
      question: "What is dynamic programming?",
      options: [
        "Solving problems recursively without memoization",
        "Breaking a problem into overlapping subproblems",
        "Sorting arrays in-place",
        "Using brute force for all solutions"
      ],
      answer: 1
    },
    {
      question: "Which property is essential for DP?",
      options: [
        "Random access",
        "Optimal substructure",
        "Hashing",
        "Divide and conquer without memoization"
      ],
      answer: 1
    }
  ]}
/>
