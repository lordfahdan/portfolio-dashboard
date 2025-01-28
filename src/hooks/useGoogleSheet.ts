import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * Custom hook untuk mengambil data dari Google Sheet API berdasarkan range.
 * Hook ini mendukung mapping data secara dinamis berdasarkan tipe data yang ditentukan.
 *
 * @template T - Tipe data yang diharapkan untuk hasil akhir.
 * @param {string} range - Range data dari Google Sheet (contoh: "Sheet1!A1:E").
 * @returns - {{
 *  data: T[] | null;
 *  loading: boolean;
 *  error: string | null;
 * }}.
 *
 * @example
 * // Contoh penggunaan di komponen
 * const mapData = (rawData: string[][]) =>
 *   rawData.map((row) => ({
 *     title: row[0],
 *     description: row[1],
 *     year: row[2],
 *   }));
 *
 * const { data, loading, error } = useGoogleSheet<MyType>("Sheet1!A2:C", mapData);
 */

const useGoogleSheet = <T>(
  range: string,
  mapData: (rawData: string[][]) => T[]
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetId = import.meta.env.VITE_SHEET_ID; // Ganti dengan Sheet ID milikmu
        const apiKey = import.meta.env.VITE_APIKEY_GOOGLE_SHEET; // Ganti dengan API Key milikmu

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
        const rawData = await axios.get(url);
        const mappedData = mapData(rawData.data.values);

        // Data dari Google Sheets API
        setData(mappedData);
      } catch (e) {
        console.log(e);
        setError('Gagal mengambil data dari Google Sheets.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range, mapData]);

  return { data, loading, error };
};

export default useGoogleSheet;
