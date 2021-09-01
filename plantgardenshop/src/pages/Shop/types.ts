export type PlantsProps = {
  id: number;
  name: string;
  picture: string;
  description: string;
  buyerPlant: string;
};

export type ListPlantsProps = {
  plant: PlantsProps;
  contract: any;
  account: any;
  setShowAlert: any;
};
