import OrderDetailTemplate from "@/component/templates/OrderDetailTemplate/OrderDetailTemplate";

export default async function OrderDetailPage({ params }) {
  const { slug } = await params;

  return <OrderDetailTemplate slug={slug} />;
} 