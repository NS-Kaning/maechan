import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import { FrappeContext } from 'frappe-react-sdk';
import { FaCheck } from 'react-icons/fa';

const TimeSelect = ({ selectedTime, setSelectedTime }) => {
  const frappeConfig = useContext(FrappeContext);
  const [availableTimes, setAvailableTimes] = useState([]);
  const colors = ['#E51C23', '#F9A825', '#0A8F08'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await frappeConfig?.call.get('maechan.booking.doctype.crematorium.crematorium.get_meta');
        const meta = r.message;
        const fieldTime = meta.fields.find((f) => f.fieldname === 'time');
        if (fieldTime) {
          const t = fieldTime.options.split('\n');
          setAvailableTimes(t);
        }
      } catch (error) {
        console.error("Error fetching time data:", error);
      }
    };

    fetchData();
  }, [frappeConfig]);

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="flex flex-wrap">
      {availableTimes.map((t, idx) => (
        <button
          key={t}
          onClick={() => handleSelectTime(t)}
          className={cn(
            'flex items-center justify-center text-center text-white rounded-md mr-4',
            { 'opacity-70': selectedTime !== t } // ลดความเข้มของปุ่มที่ไม่ได้เลือก
          )}
          style={{
            width: '161px',
            height: '55px',
            backgroundColor: colors[idx % colors.length],
            position: 'relative',
          }}
        >
          {t}
          {selectedTime === t && (
            <FaCheck
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                color: 'white',
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default TimeSelect;
