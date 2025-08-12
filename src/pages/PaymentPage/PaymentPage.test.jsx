import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaymentPage from "./PaymentPage";
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

    it('renders the word total correctly', () => {
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
            <PaymentPage />
        </MemoryRouter>
        );

        const txtElement2 = screen.getAllByText(/Total:/i);
        expect(txtElement2.length).toBeGreaterThan(0);
    });

    it("renders payment form with all fields", () => {
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
            <PaymentPage />
        </MemoryRouter>
        );

        const txtElement = screen.getAllByPlaceholderText(/name on card/i);
        expect(txtElement.length).toBeGreaterThan(0);

        const txtElement2 = screen.getAllByPlaceholderText(/card number/i);
        expect(txtElement2.length).toBeGreaterThan(0);

        const txtElement3 = screen.getAllByPlaceholderText(/mm\/yy/i);
        expect(txtElement3.length).toBeGreaterThan(0);

        const txtElement4 = screen.getAllByPlaceholderText(/cvv/i);
        expect(txtElement4.length).toBeGreaterThan(0);
    });

    // it("has input fields for card details", () => {
    //     mockUseCart.mockReturnValue({ 
    //         items: [
    //             {
    //               category: "Wearables",
    //               description: "Water-resistant smartwatch",
    //               id: "2",
    //               image: "/images/Smartwatch_Series_5.avif",
    //               name: "Smartwatch Series 5",
    //               price: 199.99,
    //               quantity: 1,
    //             },
    //           ],
    //      });
    
    //     render(
    //     <MemoryRouter>
    //         <PaymentPage />
    //     </MemoryRouter>
    //     );

    //     const cardNameInput = screen.getByRole('textbox', { name: /name/i });
    //     // expect(cardNameInput.length).toBeGreaterThan(0);
    //     expect(cardNameInput).toBeInTheDocument();
    // });

    it ("renders the word 'Payment Details'", () => {
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
            <PaymentPage />
        </MemoryRouter>
        );

        const txtElement = screen.getAllByText(/payment details/i);
        expect(txtElement.length).toBeGreaterThan(0);
    })
});