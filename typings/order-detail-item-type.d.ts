interface order_detail_idType {}

interface deleted_atType {}

interface order_detailType {}

interface pay_per_cartonType {}

interface driver_detailType {
  id: number;
  supplier_id: number;
  name: string;
  country_code: string;
  mobile_number: string;
  username: string;
  password: string;
  image: string;
  lat: string;
  lng: string;
  city_id: number;
  country_id: number;
  zone_id: string;
  driver_type: string;
  vehical_type: string;
  enable: number;
  status: number;
  nationality: string;
  fcm_token: string;
  pay_per_carton: pay_per_cartonType;
  language: string;
  created_at: string;
  updated_at: string;
  deleted_at: deleted_atType;
  contact_visiblity: string;
}

interface order_detailType {
  id: number;
  order_serial: string;
  order_type: string;
  user_id: number;
  amount: number;
  vat: number;
  vat_percent: number;
  delivery_charges: number;
  giftcard_charge: number;
  discount: number;
  discount_code: string;
  discount_type: string;
  final_amount: number;
  payment_type: string;
  payment_scheme: payment_schemeType;
  iban_id: iban_idType;
  giftcard_id: giftcard_idType;
  status: string;
  remarks: string;
  invoice_file: string;
  rating_status: string;
  cancelled_by: cancelled_byType;
  is_test: number;
  created_by: created_byType;
  created_at: string;
  updated_at: string;
  deleted_at: deleted_atType;
}

export interface orderDetailItemType {
  id: number;
  order_detail_id: order_detail_idType;
  warehouse_id: number;
  driver_id: number;
  is_deliver: number;
  status: number;
  supplier_id: number;
  item: string;
  quantity: number;
  unit_cost: number;
  vat: number;
  total_cost: number;
  created_at: string;
  updated_at: string;
  deleted_at: deleted_atType;
  order_detail: order_detailType;
  driver_detail: driver_detailType;
}
