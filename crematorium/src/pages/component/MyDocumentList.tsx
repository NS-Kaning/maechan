import { useFrappeGetDocList } from 'frappe-react-sdk'; // Adjust the import according to your setup

interface CrematoriumDocument {
  [key: string]: any; 
}

export const MyDocumentList = () => {
  const { data, error, isValidating, mutate } = useFrappeGetDocList<CrematoriumDocument>(
    'Crematorium', 
    {
      fields: ['*'], // Fetch all fields
      filters: [], // Add filters if needed
      limit_start: 0,
      limit: 10,
      orderBy: {
        field: 'creation', // You can change this to another field if needed
        order: 'desc',
      },
      asDict: false,
    }
  );

  // Update formatDate function to handle UTC correctly and format as DD/MM/YYYY
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp + 'Z'); // Treat as UTC
    const year = date.getUTCFullYear(); // Get UTC year
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get UTC month and pad with zero
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get UTC day and pad with zero

    return `${day}/${month}/${year}`; // Returns 'DD/MM/YYYY'
  };

  if (isValidating) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    console.error("Error fetching documents:", error); // Log the error
    return (
      <div className="text-red-600">
        <h2>Error fetching documents</h2>
        <p>{error.message || JSON.stringify(error)}</p>
      </div>
    );
  }

  if (data && data.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        {data.map((crematorium, index) => (
          <div
            key={`${crematorium.id}-${index}`}
            className="flex flex-wrap mr-36 ml-4 px-6 text-[12px] justify-between self-stretch p-6 whitespace-nowrap rounded-xl text-zinc-600 max-md:px-6 max-md:max-w-full"
          >
            <div className="flex ml-3 flex-1 min-w-[150px] gap-12">
              <div>{index + 1}</div>
              {/* Format crematorium[22] to display only date */}
              <div>{crematorium[22] ? formatDate(crematorium[22]) : 'Date Not Available'}</div>
              <div className={`text-red-600 ${crematorium.status ? '' : 'text-gray-500'}`}>
                {crematorium.status || 'Status Not Available'}
              </div>
            </div>
            <div className="flex gap-[45px] mr-7">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/137d2199165f7c4c97e97844916fbd7771e08903d41e8c9fd6084a00ab18ece3?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                alt="Icon 1"
                className="w-[25px] aspect-[1.06]"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/42ab84ac8b073b2f2b2efc92fc4012a7c7060a87e3b3d3e8d35b47e3c9b7f796?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                alt="Icon 2"
                className="w-[25px] aspect-[1.06]"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63615a723ccfaca2c988e27711f3d09d091070bfb21a6e8978220d7fa342a34?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
                alt="Icon 3"
                className="w-[25px] aspect-[1.06]"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div>No documents found.</div>;
};
