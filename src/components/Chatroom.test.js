import {render} from "@testing-library/react";
import { Chatroom } from "./Chatroom";

describe("Chatroom", () => {

    it("renders without crashing", () => {
        const {getByText} = render(<Chatroom />);
    
        const title = getByText(/Chatroom/i);
        expect(title.nodeName).toBe("H2");
        
        const content = getByText(/Send/i);
        expect(content.nodeName).toBe("BUTTON");
    });
    
});