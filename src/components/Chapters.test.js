import {fireEvent, render} from "@testing-library/react";
import { Chapters } from "./Chapters";

describe("Chapters", () => {

    it("renders without crashing", () => {
        const {getByText} = render(<Chapters />);
        const title = getByText(/Chapitres/i);
        expect(title.nodeName).toBe("H2");
    });
    
    it("list can render without crashing", () => {
        const props = {
            chapters: [
                {"pos":"0","title":"Start"},
                {"pos":"45","title":"Intro"}
            ],
            onSelectChapter: () => {}
        }
        const {getByText} = render(<Chapters {...props} />);
    
        // Check if the first chapter appear
        const chapter1 = getByText(/Start/i);
        expect(chapter1.nodeName).toBe("BUTTON");
    
        // Check if the first chapter appear
        const chapter2 = getByText(/Intro/i);
        expect(chapter2.nodeName).toBe("BUTTON");
    });
    
    it("can be clicked", () => {
        const handleClick = jest.fn()
        const props = {
            chapters: [
                {"pos":"0","title":"Start"},
            ],
            onSelectChapter: handleClick
        }
        const {getByText} = render(<Chapters {...props} />);
        fireEvent.click(getByText(/Start/i));
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
    
});
