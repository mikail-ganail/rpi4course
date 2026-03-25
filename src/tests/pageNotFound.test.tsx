import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../pages/not-found-page/not-found-page";
import { AppRoute } from "../const";

describe("NotFoundPage", () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

  it("отображает заголовок 404", () => {
    renderPage();

    expect(screen.getByText("404 - Страница не найдена")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /страница не найдена/i }),
    ).toBeInTheDocument();
  });

  it("отображает текст об отсутствии страницы", () => {
    renderPage();

    expect(
      screen.getByText("Запрашиваемая страница не существует."),
    ).toBeInTheDocument();
  });

  it("ссылка на главную страницу присутствует", () => {
    renderPage();

    // Ищем ссылку по тексту, который реально есть в компоненте
    const link = screen.getByRole("link", { name: /главную/i });
    expect(link).toBeInTheDocument();
  });

  it('ссылка ведет на "/"', () => {
    renderPage();

    const link = screen.getByRole("link", { name: /главную/i });
    expect(link).toHaveAttribute("href", AppRoute.Main);
    expect(link.getAttribute("href")).toBe("/");
  });
});
