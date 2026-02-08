export type Specification = {
  pixel?: string | null;
  chip_size?: string | null;
  fov?: string | null;
  no_of_lens?: string | null;
  efl?: string | null;
  f_no?: string | null;
  tv_d?: string | null;
};

export type CameraModule = {
  id: number;
  model_no?: string | null;
  sensor_model?: string | null;
  features_en?: string | null;
  features_cn?: string | null;
  interface_method?: string | null;
  application_platform?: string | null;
  system_adoption?: string | null;
  price_rmb?: string | null;
  price_usd?: string | null;
  model_size?: string | null;
  specification?: Specification | null;
};

export type CameraModuleListResponse = {
  total: number;
  items: CameraModule[];
};
