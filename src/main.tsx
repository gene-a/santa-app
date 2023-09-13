import axios from 'axios'
import React from "react";
import ReactDOM from "react-dom/client";
import { userFetcher } from "./server/services/user-fetcher"
import { userProfileFetcher } from "./server/services/user-profile-fetcher"
import { utils } from "./server/services/utils";
import { apiConfig } from '../config/api-config';

// Main App
function App() {
  // State variables for input fields
  const [userId, setUserId] = React.useState("")
  const [wish, setWish] = React.useState("")
  const [modalMessage, setModalMessage] = React.useState("")
  const [validationMessage, setErrorMessage] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(false) 
  const [modalDisplay, setModalDisplay] = React.useState({})

  // Validation constraint constants
  const maxWishLength = 100
  const maxUserAge = 10

  // Trigger the modal
  const triggerModal = (message) => {
    setModalMessage(message)
    openModal()
  }

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true)
    setModalDisplay({
      display: 'block'
    })
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false)
    setModalDisplay({
      display: 'none'
    })
  };

  // Username change handler
  const handleUserIdChange = (event) => {
    setUserId(event.target.value)
  };

  // Wish content change handler
  const handleWishChange = (event) => {
    const newWish = event.target.value
    setWish(newWish)
    let message = ''

    // Check if length of wish input has reached 100
    // Even if the input field already has a maxLength attribute for constraints and won't allow more than 100 characters, we put this message to let the user know of the restriction
    if (newWish.length >= maxWishLength) {
      // Set the error message
      message = 'I know you are eager for gifts but know that the wish length should only be 100 characters long!'
    }

    // Update the error message as necessary
    setErrorMessage(message)
  };

  // Form submit handler
  const  handleSubmit = async (event) => {
    // Preventing default submit behavior so we can call the API for validation before submitting and other shenanigans
    event.preventDefault()

    // Default error message that is called when:
        // User profile was not found
        // User is invalid display
        // Age is greater than limit
    let modalMessage = `You can't send wishes if you're not registered or over ${maxUserAge} year(s) old! Sorry. From hohoho to huhuhu real quick.`
    
    if (wish && userId && typeof(wish) === 'string' && wish.length <= maxWishLength) {
      try {
        // Check if child is registered by first getting the child info via username
        const user = await userFetcher.getUserByUsername(userId)
        if (user) {
          // Now get the user's profile
          const userProfile = await userProfileFetcher.getUserProfileByUuid(user.uid)
          if (userProfile) {
            // Calculate age if they're allowed to send wishes
            if (utils.calculateAge(userProfile.birthdate) <= maxUserAge) {
              // Create the wish
              const wishData = {
                user: user,
                userAddress: userProfile.address,
                wish: wish,
              };

              // Make a POST request to the wish endpoint
              const response = await axios.post(apiConfig.WISH_API.POST_WISH, wishData)
              
              // Exit the function if all is good i.e. all conditions are passed and the wish is created
              modalMessage = `Wish successfully created! You must be excited ${userId}! We will be mailing santa soon!`
              return response
            }
          } 
        }         
      } catch (e) {
        modalMessage = `An error occured while creating the wish...can you try again?`
      } finally {
        // Show the modal whether wish creation request was successful or not
        triggerModal(modalMessage)
      }
    }
  };

  // Modal component
  function ErrorModal({ message, modalDisplay, onClose }) {
    return (
      <div className="modal" style={modalDisplay}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <p>{message}</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what do you want for Christmas?</p>

        <label htmlFor="userid">who are you?</label>
        <input
          name="userid"
          id="userid"
          placeholder="Your Username"
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
            placeholder="List the gifts you want here!"
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
        style={{ position: "fixed", top: "20px", right: "20px" }}>
      </div>
      {/* Display the modal if isModalOpen is true */}
      {isModalOpen && (
        <ErrorModal message={modalMessage} modalDisplay={modalDisplay} onClose={closeModal} />
      )}
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