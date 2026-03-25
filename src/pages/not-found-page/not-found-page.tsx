import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

function NotFoundPage() {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left"></div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container">
          <section style={{ textAlign: "center", padding: "100px 0" }}>
            <h1>404 - Страница не найдена</h1>
            <p>Запрашиваемая страница не существует.</p>
            <Link
              to={AppRoute.Main}
              style={{
                color: "#4481c3",
                textDecoration: "underline",
                display: "inline-block",
                marginTop: "20px",
              }}
            >
              Вернуться на главную
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export { NotFoundPage };
