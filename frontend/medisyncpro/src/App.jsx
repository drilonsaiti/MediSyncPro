import GlobalStyles from "./styles/GlobalStyles.js";

function App() {

  return (
    <>
      <GlobalStyles />
      <div style={{backgroundColor: "var(--color-grey-50)"}}>
    <h1 style={{color: "var(--color-grey-600)"}}>The work begin...</h1>
          <button style={{backgroundColor: "var(--color-primary-1700)"}}>Click it</button>
      </div>
    </>
  )
}

export default App
