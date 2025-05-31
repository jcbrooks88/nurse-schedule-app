import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PENDING_REQUESTS } from "../graphql/queries";
import { APPROVE_SHIFT_REQUEST, REJECT_SHIFT_REQUEST } from "../graphql/mutations";
import { CheckCircle, XCircle } from "lucide-react";
import Button from "./UI/Button";

type ShiftRequest = {
  id: string;
  requester: {
    name: string;
    email: string;
  };
  shift: {
    title: string;
    start: string;
    end: string;
  };
};

// Helper functions to format shift dates
const formatShiftDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  if (isNaN(date.getTime()) || date > now) {
    return "Future date";
  }
  return date.toLocaleString();
};

const formatShiftDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  if (isNaN(date.getTime()) || date > now) {
    return "Future date";
  }
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AdminDashboard() {
  const { data, loading, error } = useQuery(GET_PENDING_REQUESTS);
  const [approve, { loading: approving }] = useMutation(APPROVE_SHIFT_REQUEST);
  const [reject, { loading: rejecting }] = useMutation(REJECT_SHIFT_REQUEST);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setActionError(null);
    try {
      await approve({
        variables: { requestId: id },
        update: (cache) => {
          const existing = cache.readQuery<{ getPendingRequests: ShiftRequest[] }>({
            query: GET_PENDING_REQUESTS,
          });
          if (existing) {
            cache.writeQuery({
              query: GET_PENDING_REQUESTS,
              data: {
                getPendingRequests: existing.getPendingRequests.filter((r) => r.id !== id),
              },
            });
          }
        },
      });
    } catch (err: unknown) {
      setActionError(
        err instanceof Error
          ? `Failed to approve request: ${err.message}`
          : "Failed to approve request due to an unknown error."
      );
    }
  };

  const handleReject = async (id: string) => {
    setActionError(null);
    try {
      await reject({
        variables: { requestId: id },
        update: (cache) => {
          const existing = cache.readQuery<{ getPendingRequests: ShiftRequest[] }>({
            query: GET_PENDING_REQUESTS,
          });
          if (existing) {
            cache.writeQuery({
              query: GET_PENDING_REQUESTS,
              data: {
                getPendingRequests: existing.getPendingRequests.filter((r) => r.id !== id),
              },
            });
          }
        },
      });
    } catch (err: unknown) {
      setActionError(
        err instanceof Error
          ? `Failed to reject request: ${err.message}`
          : "Failed to reject request due to an unknown error."
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-background rounded-2xl shadow-burgundy border border-burgundyLight">
        <h1 className="text-3xl font-bold text-grayDark mb-4">Pending Shift Requests</h1>
        <p className="text-grayDark animate-pulse">Loading shift requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-burgundy border border-grayDarker text-grayDark rounded-lg shadow-sm">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const requests: ShiftRequest[] = data?.getPendingRequests ?? [];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-background rounded-2xl border border-burgundyLight space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-grayLight">Pending Shift Requests</h1>
        <span className="text-sm px-3 py-1 bg-grayLight/20 text-grayDarker rounded-full font-medium">
          {requests.length} Pending
        </span>
      </div>

      {actionError && (
        <div className="p-4 bg-orangeLight border border-orange text-orange rounded-md">
          {actionError}
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-grayLight italic">No pending requests.</p>
      ) : (
        <ul className="space-y-6">
          {requests.map((req) => (
            <li
              key={req.id}
              className="group transition-transform hover:scale-[1.01] p-6 bg-white rounded-xl border border-burgundyLight shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-burgundyLight group-hover:text-tealLight transition-colors">
                  {req.shift.title}
                </h2>
                <div className="text-xs text-grayLight mt-1">
                  {formatShiftDay(req.shift.start)}
                </div>
              </div>

              <div className="mt-3 text-sm text-grayDark space-y-1">
                <p>
                  <span className="font-medium">Requested by:</span> {req.requester.name}{" "}
                  <span className="text-grayLight">({req.requester.email})</span>
                </p>
                <p>
                  <span className="font-medium">Start:</span>{" "}
                  {formatShiftDate(req.shift.start)}
                </p>
                <p>
                  <span className="font-medium">End:</span>{" "}
                  {formatShiftDate(req.shift.end)}
                </p>
              </div>

              <div className="flex gap-4 pt-5">
                <Button
                  onClick={() => handleApprove(req.id)}
                  disabled={approving || rejecting}
                  className="flex items-center gap-2"
                  variant="default"
                >
                  <CheckCircle className="w-4 h-4" />
                  {approving ? "Approving..." : "Approve"}
                </Button>
                <Button
                  onClick={() => handleReject(req.id)}
                  disabled={approving || rejecting}
                  className="flex items-center gap-2"
                  variant="destructive"
                >
                  <XCircle className="w-4 h-4" />
                  {rejecting ? "Denying..." : "Deny"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
