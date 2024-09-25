import React from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';

export default function Nav() {
  const { currentUser } = useFrappeAuth();
//   console.log(currentUser);

  return (
    <div>
      <div className="flex justify-between items-center px-20 w-full max-h-6">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6af0b2fc646d407ec3b95c5514da7850482402df51d346618df500b9fee0b7d7?placeholderIfAbsent=true&apiKey=d2ea1981bd5246b0a7a3b636b55c7b9d"
            className="object-contain shrink-0 w-10"
            alt="Book Crematorium Logo"
          />
          <div className="text-base font-bold">BOOK CREMATORIUM</div>
        </div>
        <div className="text-sm">
          {currentUser}
        </div>
      </div>
    </div>
  );
}
