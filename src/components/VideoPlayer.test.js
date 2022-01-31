import {render} from "@testing-library/react";
import { VideoPlayer } from "./VideoPlayer";

describe("VideoPlayer", () => {

    it("renders without crashing", () => {
        render(<VideoPlayer />);
    });
    
});