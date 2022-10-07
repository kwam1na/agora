import { mockUser } from "@/utils/mock-data";
import * as React from "react";

export const UserContext = React.createContext({ user: mockUser });
