import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <small>
          Please try refreshing the page, or{" "}
          <a href="/">return to the homepage</a>.
        </small>
      </p>
    </div>
  );
}