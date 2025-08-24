type ErrorProps = {
  title?: string;
  message?: string;
};

export default function AppError({ title = 'Something went wrong', message = 'Please try again later.' }: ErrorProps) {
  return (
    <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
      <h2 className="font-semibold mb-1">{title}</h2>
      <p className="text-sm">{message}</p>
    </div>
  );
} 