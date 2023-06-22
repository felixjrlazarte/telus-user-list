import renderWithProviders from "../../../../utils/test-utils";
import { Users } from './Users';

const customConfig = {
  preloadedState: {
    users: {
      list: [{
        name: "Juan Dela Cruz",
        phone: "+639000000001",
        email: "juan.delacruz@sampleemail.com"
      }]
    }
  }
};

describe("Users component", () => {
  it("should render Users card component correctly", () => {
    const { getAllByText } = renderWithProviders(<Users />, customConfig);

    expect(getAllByText("Juan Dela Cruz")[0]).toBeInTheDocument();
    expect(getAllByText("+639000000001")[0]).toBeInTheDocument();
    expect(getAllByText("juan.delacruz@sampleemail.com")[0]).toBeInTheDocument();
  });
});