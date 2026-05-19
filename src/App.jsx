import "./App.css";
import { useState } from "react";

function App() {
  const [closeReturnValue, setCloseReturnValue] = useState("");
  const [requestCloseReturnValue, setRequestCloseReturnValue] = useState("");
  const [blockRequestClose, setBlockRequestClose] = useState(false);
  const [requestCloseLog, setRequestCloseLog] = useState([]);
  const [customCommand, setCustomCommand] = useState("");

  function logRequestClose(message) {
    setRequestCloseLog((prev) => [...prev.slice(-4), message]);
  }

  return (
    <div className="app">
      <h1>Command attribute examples</h1>
      <p className="intro">
        Buttons use <code>commandfor</code> to target an element by id and{" "}
        <code>command</code> to run a built-in or custom action.
      </p>

      <section className="demo-section">
        <h2>Popover</h2>
        <p className="hint">
          Target: <code>#demo-popover</code> (<code>popover="auto"</code>)
        </p>
        <div className="button-row">
          <button type="button" commandfor="demo-popover" command="show-popover">
            show-popover
          </button>
          <button type="button" commandfor="demo-popover" command="hide-popover">
            hide-popover
          </button>
          <button
            type="button"
            commandfor="demo-popover"
            command="toggle-popover"
          >
            toggle-popover
          </button>
        </div>
        <div id="demo-popover" popover="auto" className="demo-popover">
          <p>Popover content</p>
          <button type="button" commandfor="demo-popover" command="hide-popover">
            hide-popover (inside)
          </button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Dialog: show-modal</h2>
        <p className="hint">
          Opens <code>#dialog-show-modal</code> as a modal (
          <code>HTMLDialogElement.showModal()</code>).
        </p>
        <button
          type="button"
          commandfor="dialog-show-modal"
          command="show-modal"
        >
          show-modal
        </button>
        <dialog id="dialog-show-modal" className="demo-dialog">
          <p>Modal dialog opened with <code>show-modal</code>.</p>
          <button type="button" commandfor="dialog-show-modal" command="close">
            close
          </button>
        </dialog>
      </section>

      <section className="demo-section">
        <h2>Dialog: close</h2>
        <p className="hint">
          Closes immediately (<code>HTMLDialogElement.close()</code>). With{" "}
          <code>value</code> on the button, that string becomes the dialog&apos;s{" "}
          <code>returnValue</code>.
        </p>
        <button type="button" commandfor="dialog-close" command="show-modal">
          Open dialog
        </button>
        <dialog
          id="dialog-close"
          className="demo-dialog"
          onClose={(e) => setCloseReturnValue(e.currentTarget.returnValue)}
        >
          <p>Choose how to close:</p>
          <div className="button-row">
            <button
              type="button"
              commandfor="dialog-close"
              command="close"
              value="confirmed"
            >
              close (value=&quot;confirmed&quot;)
            </button>
            <button
              type="button"
              commandfor="dialog-close"
              command="close"
              value="dismissed"
            >
              close (value=&quot;dismissed&quot;)
            </button>
          </div>
        </dialog>
        <p className="result">
          Last <code>returnValue</code>:{" "}
          <code>{closeReturnValue || "(none yet)"}</code>
        </p>
      </section>

      <section className="demo-section">
        <h2>Dialog: request-close</h2>
        <p className="hint">
          Fires <code>cancel</code> then <code>close</code> (
          <code>HTMLDialogElement.requestClose()</code>). Call{" "}
          <code>preventDefault()</code> on <code>cancel</code> to keep the dialog
          open.
        </p>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={blockRequestClose}
            onChange={(e) => setBlockRequestClose(e.target.checked)}
          />
          Block close on <code>cancel</code>
        </label>
        <button type="button" commandfor="dialog-request-close" command="show-modal">
          Open dialog
        </button>
        <dialog
          id="dialog-request-close"
          className="demo-dialog"
          onCancel={(e) => {
            logRequestClose(
              blockRequestClose
                ? "cancel (default prevented — dialog stays open)"
                : "cancel (allowed — dialog will close)",
            );
            if (blockRequestClose) {
              e.preventDefault();
            }
          }}
          onClose={(e) => {
            setRequestCloseReturnValue(e.currentTarget.returnValue);
            logRequestClose(
              `close (returnValue: ${e.currentTarget.returnValue || "empty"})`,
            );
          }}
        >
          <p>Try request-close with or without blocking:</p>
          <button
            type="button"
            commandfor="dialog-request-close"
            command="request-close"
            value="requested"
          >
            request-close (value=&quot;requested&quot;)
          </button>
        </dialog>
        <p className="result">
          Last <code>returnValue</code>:{" "}
          <code>{requestCloseReturnValue || "(none yet)"}</code>
        </p>
        {requestCloseLog.length > 0 && (
          <ul className="event-log">
            {requestCloseLog.map((entry, i) => (
              <li key={`${entry}-${i}`}>{entry}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="demo-section">
        <h2>Custom invoker command</h2>
        <p className="hint">
          Names starting with <code>--</code> are author-defined. The target
          receives a <code>command</code> event; handle it in{" "}
          <code>onCommand</code> (no browser default behavior).
        </p>
        <div className="button-row">
          <button
            type="button"
            commandfor="custom-target"
            command="--highlight"
          >
            --highlight
          </button>
          <button type="button" commandfor="custom-target" command="--reset">
            --reset
          </button>
        </div>
        <div
          id="custom-target"
          className={`custom-target${customCommand === "--highlight" ? " custom-target--highlight" : ""}`}
          onCommand={(e) => setCustomCommand(e.command)}
        >
          <p>Command target</p>
          <p className="result">
            Last <code>event.command</code>:{" "}
            <code>{customCommand || "(none yet)"}</code>
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
