import type { User } from "@/types";

const Coin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="47" height="43" fill="none">
    <mask id="a" width="47" height="43" x="0" y="0" maskUnits="userSpaceOnUse">
      <ellipse cx="23.5" cy="21.5" fill="#D9D9D9" rx="23.5" ry="21.5" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#2B83EC"
        d="M23.5 46.071c4.74 0 9.398-1.14 13.496-3.306 4.1-2.165 7.495-5.278 9.841-9.021 2.346-3.744 3.56-7.986 3.519-12.294-.042-4.309-1.338-8.53-3.756-12.236l-23.1 12.45v24.407Z"
      />
      <path
        fill="#22A6F5"
        d="M44.784 10.258c-2.17-3.438-5.296-6.29-9.06-8.264C31.959.019 27.69-1.008 23.35-.984 19.011-.96 14.757.115 11.02 2.13c-3.738 2.016-6.826 4.902-8.95 8.364L23.5 21.5l21.284-11.242Z"
      />
      <path
        fill="#1AC9FF"
        d="M2.217 10.258c-2.161 3.424-3.297 7.31-3.293 11.264.004 3.955 1.149 7.838 3.317 11.259 2.169 3.42 5.285 6.257 9.035 8.224 3.75 1.967 8 2.995 12.322 2.979L23.5 21.5 2.217 10.258Z"
      />
    </g>
  </svg>
);

export default function CoinCounter({ balance }: Pick<User, "balance">) {
  return (
    <div className="w-full items-center justify-center flex gap-2 py-2">
      <span className="text-white balance">{balance}</span>
      <Coin />
    </div>
  );
}
