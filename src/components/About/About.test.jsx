import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "./About";
import "@testing-library/jest-dom/vitest";
import "vitest-dom/extend-expect";

describe("About", () => {
  it("renders the About page with correct title", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  it("displays the company description", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const descriptions = screen.getAllByText(/Welcome to Magret's e-commerce platform!/i);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it("displays the company mission", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const descriptions = screen.getAllByText(/Our mission is to offer high-quality products/i);
    expect(descriptions.length).toBeGreaterThan(0);
  });
});