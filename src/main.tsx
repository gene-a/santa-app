import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  // State variables for input fields
  const [userId, setUserId] = React.useState("");
  const [wish, setWish] = React.useState("");
  const [validationMessage, setErrorMessage] = React.useState("");

  // Validation constraint constants
  const maxWishLength = 100;

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleWishChange = (event) => {
    const newWish = event.target.value;
    setWish(newWish);

    // Check if length of wish input has reached 100
    // Even if the input field already has a maxLength attribute for constraints and won't allow more than 100 characters, we put this message to let the user know of the restriction
    if (newWish.length >= maxWishLength) {
      setErrorMessage('I know you are eager for gifts but know that the wish length should only be 100 characters long!');
    } else {
      setErrorMessage(""); // Clear the error message
    }
  };

  const handleSubmit = (event) => {
    // Preventing default submit behavior so we can call the API for validation before submitting
    event.preventDefault();
    
  };

  return (
    <div>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>

        <label htmlFor="userid">who are you?</label>
        <input
          name="userid"
          id="userid"
          placeholder="charlie.brown"
          value={userId}
          onChange={ handleUserIdChange }
        />

        <form method="post" onSubmit={ handleSubmit }>
          <label htmlFor="wish">what do you want for Christmas?</label>
          <textarea
            name="wish"
            id="wish"
            rows={10}
            cols={45}
            maxLength={maxWishLength}
            placeholder="Gifts!"
            value={wish}
            onChange={ handleWishChange }>
          </textarea>
          {/* Display error message */}
          { validationMessage && <div className="error">{validationMessage }</div>}
          <br />
          <button type="submit" id="submit-letter">
            Send
          </button>
        </form>
      </main>

      <footer>
        Made with <a href="https://glitch.com">Glitch</a>!
      </footer>

      <div
        className="glitchButton"
        style={{ position: "fixed", top: "20px", right: "20px" }}
      ></div>
    </div>
  );
}

const rootElement = document.getElementById("root");

// Just to make sure that the index.html contains the root element before we attempt to render anything
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found. Failed to render React App");
}