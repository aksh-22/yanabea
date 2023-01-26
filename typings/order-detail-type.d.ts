interface order_detail_idType {}

interface delivery_chargeType {}

interface deleted_atType {}

interface driver_detailType {
  id: number;
  name: string;
  mobile: string;
}

interface orderDetailItemType {
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
  delivery_charge: delivery_chargeType;
  total_cost: number;
  created_at: string;
  updated_at: string;
  deleted_at: deleted_atType;
  driver_detail: driver_detailType;
}
