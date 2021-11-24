import styled from 'styled-components'

// const Button = styled.button``

// const Header = styled.header`
//   background-color: #cc1003;
// `;

export default function HeaderComponent() {
  return (
    // <Header>SomeContext</Header>
    <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <nav>
        <img alt='logo'></img>
        <a href="/">Home</a>
        <a href="/api/health">Health</a>
      </nav>
    </header>
  );
}
