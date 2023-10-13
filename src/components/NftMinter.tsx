import { PublicKey } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { mintWithMetaplexJs } from "utils/metaplex";
import { notify } from "utils/notifications";
import ColorThief from "colorthief/dist/color-thief.mjs";

const TOKEN_NAME = "Solana Workshop NFT";
const TOKEN_SYMBOL = "SHOP";
const TOKEN_DESCRIPTION = "NFT minted in the NFT Minter workshop!";
const WORKSHOP_COLLECTION = new PublicKey(
  "CPpyd2Uq1XkCkd9KHswjttdQXTvZ4mmrnif3tXg9i8sk"
);

export const NftMinter: FC = () => {
  const { connection } = useConnection();
  const { networkConfiguration } = useNetworkConfiguration();
  const wallet = useWallet();

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [NFT, setNFT] = useState(null);
  const [mintAddress, setMintAddress] = useState(null);
  const [mintSignature, setMintSignature] = useState(null);

  const uploadImage = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedImage = event.target.files[0];
      setImage(uploadedImage);
      setCreateObjectURL(URL.createObjectURL(uploadedImage));
      const body = new FormData();
      body.append("file", uploadedImage);
      await fetch("/api/upload", {
        method: "POST",
        body,
      }).catch((res) => {
        notify({ type: "error", message: `Upload failed!`, description: res });
        console.log("error", `Upload failed! ${res}`);
      });
    }
  };

  const drawNFTwithColor = (palette) => {
    // Canvas 엘리먼트를 생성합니다.
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;
    // 색상 넣기
    const colors = palette.map(
      (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    );

    // 도안 그리기
    {
      // 하늘 그리기
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 풀 그리기
      ctx.fillStyle = colors[1];
      ctx.fillRect(0, 250, canvas.width, canvas.height - 250);

      // 꽃 그리기
      function drawFlower(x, y, stem, petal, center) {
        // 꽃 줄기 그리기
        ctx.fillStyle = stem;
        ctx.fillRect(x + 20, y - 50, 10, 100);

        // 꽃잎 그리기
        ctx.fillStyle = petal;
        ctx.beginPath();
        ctx.arc(x + 20, y - 40, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 20, y - 60, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 30, y - 50, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 10, y - 50, 15, 0, Math.PI * 2);
        ctx.fill();

        // 꽃 중심 그리기
        ctx.fillStyle = center;
        ctx.beginPath();
        ctx.arc(x + 20, y - 50, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // 꽃 그리기
      drawFlower(50, 250, colors[9], colors[1], colors[0]);
      drawFlower(150, 270, colors[8], colors[2], colors[1]);
      drawFlower(250, 250, colors[7], colors[4], colors[2]);
      drawFlower(100, 300, colors[6], colors[6], colors[3]);
      drawFlower(200, 300, colors[5], colors[8], colors[4]);
    }

    // Canvas를 이미지로 변환
    const image = document.createElement("img");
    image.src = canvas.toDataURL(); // Canvas를 데이터 URL로 변환하여 이미지로 만듭니다.

    // Canvas에서 데이터 URL을 추출합니다.
    const dataUrl = canvas.toDataURL("image/jpeg"); // 이미지 형식에 따라 변경

    // 데이터 URL을 Blob로 변환합니다.
    const parts = dataUrl.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const byteCharacters = atob(parts[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    // Blob을 File 객체로 변환합니다.
    const file = new File([blob], "nft.jpg", { type: "image/jpeg" });
    setNFT(file);
  };

  const makeNFTfromImage = () => {
    const colorThief = new ColorThief();

    const imageElement = document.createElement("img");
    imageElement.src = createObjectURL;
    imageElement.crossOrigin = "Anonymous";

    if (imageElement.complete) {
      const palette = colorThief.getPalette(imageElement, [0, 10, 10]);
      drawNFTwithColor(palette);
    } else {
      imageElement.addEventListener("load", function () {
        const palette = colorThief.getPalette(imageElement, [0, 10, 10]);
        drawNFTwithColor(palette);
      });
    }
  };
  const onClickMintNft = useCallback(async () => {
    console.log(NFT);
    if (!wallet.publicKey) {
      console.log("error", "Wallet not connected!");
      notify({
        type: "error",
        message: "error",
        description: "Wallet not connected!",
      });
      return;
    }
    await mintWithMetaplexJs(
      connection,
      networkConfiguration,
      wallet,
      TOKEN_NAME,
      TOKEN_SYMBOL,
      TOKEN_DESCRIPTION,
      WORKSHOP_COLLECTION,
      NFT
    ).then(([mintAddress, signature]) => {
      setMintAddress(mintAddress);
      setMintSignature(signature);
    });
  }, [wallet, connection, networkConfiguration, NFT]);

  return (
    <div>
      <div className="flex flex-col items-center gap-8">
        {createObjectURL && (
          <Image
            alt="uploaded image"
            width="300"
            height="300"
            src={createObjectURL}
          />
        )}
        {NFT && (
          <Image
            alt="your Plocka"
            width="300"
            height="300"
            src={URL.createObjectURL(NFT)}
          />
        )}
        {!mintAddress && !mintSignature && !createObjectURL && (
          <div className="mx-auto text-center mb-2">
            <div className="text-xl mb-8">Upload your Plogging Proof Shot!</div>
            <input className="mx-auto" type="file" onChange={uploadImage} />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center">
        <div className="relative group items-center">
          {createObjectURL && !mintAddress && !mintSignature && (
            <div className="flex flex-col items-center gap-8">
              <button
                className="px-8 m-2 mt-4 btn animate-pulse bg-gradient-to-br from-accent to-primary hover:from-white hover:to-accent text-black text-lg"
                onClick={!NFT ? makeNFTfromImage : onClickMintNft}>
                <span>
                  {!NFT ? "Make Plocka from image" : "Mint Plocka NFT"}
                </span>
              </button>
              <div>
                <button
                  className="btn"
                  onClick={() => {
                    setCreateObjectURL(null);
                    setImage(null);
                    setNFT(null);
                  }}>
                  Retry
                </button>
              </div>
            </div>
          )}

          {mintAddress && mintSignature && (
            <div>
              <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
                <p>Mint successful!</p>
                <p className="text-xl mt-4 mb-2">
                  Mint address:{" "}
                  <span className="font-bold text-lime-500">
                    <a
                      className="border-b-2 border-transparent hover:border-lime-500"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://explorer.solana.com/address/${mintAddress}?cluster=${networkConfiguration}`}>
                      {mintAddress}
                    </a>
                  </span>
                </p>
                <p className="text-xl">
                  Tx signature:{" "}
                  <span className="font-bold text-amber-600">
                    <a
                      className="border-b-2 border-transparent hover:border-amber-600"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://explorer.solana.com/tx/${mintSignature}?cluster=${networkConfiguration}`}>
                      {mintSignature}
                    </a>
                  </span>
                </p>
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
