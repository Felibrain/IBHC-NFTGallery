import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";

import { fetcher } from "utils/fetcher";

type Props = {
  details: any;
  onSelect: (id: string) => void;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  onSelect,
  onTokenDetailsFetched = () => {},
}) => {
 // console.log("DETAILS ", details)
  const [fallbackImage, setFallbackImage] = useState(false);
 

//6v9NfGBVf6dhV2tMqpJd5HxAVEa119Rb5G1dk5o9FZqz = 1st CREATOR
  const { name, uri } = details?.data ?? {};
  const  mint  = details?.mint;
  const solscan = 'https://solscan.io/token/'; 
  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // console.log("data", data);

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image } = data ?? {};

  return (
    <div className={`card bordered max-w-xs compact rounded-md`}>
      <figure className="min-h-16 animation-pulse-color">
        {!fallbackImage || !error ? (
          <img
            src={image}
            onError={onImageError}
            className="bg-gray-800 object-cover"
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
            <EyeOffIcon className="h-16 w-16 text-white-500" />
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm text-left">{name}</h2>
       <p><a href={solscan+mint} target="_blank" className="btn btn-primary btn-sm">View on SolScan</a></p>
      </div>
    </div>
  );
};
