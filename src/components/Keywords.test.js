import {render} from "@testing-library/react";
import { Keywords } from "./Keywords";

describe("Keywords", () => {

    it("renders without crashing", () => {
        const {getByText} = render(<Keywords />);
    
        const title = getByText(/Mots clés/i);
        expect(title.nodeName).toBe("H2");
        
        const content = getByText(/No keywords/i);
        expect(content.nodeName).toBe("DIV");
    });

    it("list can render without crashing", () => {
        const props = {
            keywords: [
                {title:"Route 66", url:"https://en.wikipedia.org/wiki/U.S._Route_66"},
                {title:"Stefan Kluge", url:"http://www.imdb.com/name/nm1667631/"}
            ]
        }
    
        const {getByText} = render(<Keywords {...props} />);
        expect(() => getByText(/No keywords/i)).toThrow('Unable to find an element');
    
        const keyword_1 = getByText(/Route 66/i);
        expect(keyword_1).toBeInTheDocument();
    
        const keyword_2 = getByText(/Stefan Kluge/i);
        expect(keyword_2).toBeInTheDocument();
    });
    
});
