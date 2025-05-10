import EditSubscriptionPage from "@/components/edit-subscription-page"

export default function EditSubscription({ params }: { params: { id: string } }) {
  return <EditSubscriptionPage id={params.id} />
}
