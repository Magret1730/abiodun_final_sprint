import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import "@testing-library/jest-dom/vitest";
import "vitest-dom/extend-expect";


const mockUseCart = vi.fn();

vi.mock("../../context/CartContext", () => ({
  useCart: () => mockUseCart(),
}));

describe("CheckoutPage", () => {
  beforeEach(() => {
    // Clears previous mock calls and implementations before each test
    mockUseCart.mockReset();
  });

  it('renders "Your cart is empty." when no items', () => {
    mockUseCart.mockReturnValue({ items: [] });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/your cart is empty\./i)).toBeInTheDocument();
  });

  it("renders product details when cart has items", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    const txtElement = screen.getByText(/smartwatch series 5/i);
    expect(txtElement).toBeInTheDocument();
  });

  it("calculates total amount correctly", () => {
    mockUseCart.mockReturnValue({
      items: [
        { id: "1", name: "Item 1", price: 10, quantity: 2 },
        { id: "2", name: "Item 2", price: 20, quantity: 1 },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/total:\s*\$40\.00/i)).toBeInTheDocument();
  });
  it ("checks the word 'Total' on screen", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    const txtElement = screen.getAllByText(/total:\s\$/i);
    expect(txtElement.length).toBeGreaterThan(0);
  });
  it ("checks the word 'Product' on screen", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    const txtElement = screen.getAllByText(/product/i);
    expect(txtElement.length).toBeGreaterThan(0);
  });
  it ("checks the word 'Qty' on screen", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );
    // const txtElement = screen.getByText(/qty/i);
    // expect(txtElement.length).toBeInTheDocument();
    const txtElement = screen.getAllByText(/qty/i);
    expect(txtElement.length).toBeGreaterThan(0);
  });
  it ("checks the word 'Price' on screen", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    const txtElement = screen.getAllByText(/price/i);
    expect(txtElement.length).toBeGreaterThan(0);
  });
  it ("checks the word 'Subtotal' on screen", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    const txtElement = screen.getAllByText(/subtotal/i);
    expect(txtElement.length).toBeGreaterThan(0);
  });
  it("renders 'Proceed to Payment' button", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    // expect(screen.getByRole("button", { name: /proceed to payment/i })).toBeInTheDocument();
    const buttons = screen.getAllByRole("button", { name: /proceed to payment/i });
    expect(buttons.length).toBeGreaterThan(0); // or check exact count
  });
  it("renders 'Cancel' button", () => {
    mockUseCart.mockReturnValue({
      items: [
        {
          category: "Wearables",
          description: "Water-resistant smartwatch",
          id: "2",
          image: "/images/Smartwatch_Series_5.avif",
          name: "Smartwatch Series 5",
          price: 199.99,
          quantity: 1,
        },
      ],
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button", { name: /cancel/i });
    expect(buttons.length).toBeGreaterThan(0); // or check exact count
  });
});
