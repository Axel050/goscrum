import { render, screen } from "@testing-library/react";
import Donate from "./Donate";

describe("renderizado en Donate", () => {
  // it("renderiza un h1", () => {
  //   render(<Donate />);
  //   expect(
  //     screen.getByRole("heading", {
  //       level: 1,
  //       name: "Colabora con el proyecto",
  //     })
  //   ).toBeInTheDocument();
  // });
  // it("renderia un a", () => {
  //   render(<Donate />);
  //   expect(screen.getByRole("link")).toHaveAttribute(
  //     "href",
  //     "https://mpago.la/2RW1MWq"
  //   );
  // });
  it("renderia un a con target blank", () => {
    render(<Donate />);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
