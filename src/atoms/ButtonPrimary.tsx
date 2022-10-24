export const ButtonPrimary = ({ onClick, children }) => (
  <button
    class="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
    onClick={onClick}
  >
    {children}
  </button>
);
