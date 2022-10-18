import { Items, Rules } from "../../types/Menu";

export interface CreateOrderPublicProps {}

export interface CreateOrderPrivateProps {
  items: Items;
  rules: Rules;
}

export interface CreateOrderProps
  extends CreateOrderPrivateProps,
    CreateOrderPublicProps {}
