import {render} from "@testing-library/react";
import App from "./App";

describe("App", () => {

    it("renders without crashing", () => {
        const {getByText} = render(<App />);
        const title = getByText(/Aloha Netflix/i);
        expect(title).toBeInTheDocument();
        expect(title.nodeName).toBe("H1");
    });
    
});