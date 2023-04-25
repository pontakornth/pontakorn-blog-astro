import { Component, createSignal, For, splitProps } from "solid-js";

interface Props {
  title: string;
  choices: string[];
  correctIndex: number;
}

const Quiz: Component<Props> = (props) => {
  const [answered, setAnswered] = createSignal(false);
  const [answerIndex, setAnswerIndex] = createSignal(-1);

  const answer = (ansIndex: number, event: MouseEvent) => {
    if (!answered()) {
      setAnswerIndex(ansIndex);
      setAnswered(true);
    }
  };
  return (
    <div class="not-prose card shadow-xl">
      <div class="card-body">
        <h3>{props.title}</h3>
        <div class="space-y-8 p-8">
          <For each={props.choices}>
            {(choice, index) => (
              <button
                onClick={[answer, index()]}
                class="btn-active btn w-full"
                classList={{
                  "btn-error":
                    index() == answerIndex() && index() != props.correctIndex,
                  "btn-success": index() == props.correctIndex && answered(),
                  "btn-disabled":
                    index() != answerIndex() &&
                    answered() &&
                    index() != props.correctIndex,
                }}
              >
                {choice}
              </button>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
