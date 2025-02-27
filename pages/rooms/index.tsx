import axios from "axios";
import { GetServerSideProps } from "next";
import { Layout } from "@/components/Layout";
import { PopupInsertRoom } from "@/components/Room/popup/PopupInsertRoom";

interface Room {
  id: number;
  type: string;
}

const RoomPage = ({ room }: { room: Room[] }) => {
  return (
    <>
      <Layout>
       <PopupInsertRoom />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    if (!id) {
      return { props: { room: [] } }; // Jika tidak ada ID, kirimkan array kosong
    }

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/room?id=${id}`
    );

    const data = res.data.data || [];

    console.log(data);
    return {
      props: { room: data },
    };
  } catch (error) {
    console.error("error Fetching room data", error);
    return {
      props: { room: [] }, // Jika terjadi error, kirimkan array kosong agar UI tetap berjalan
    };
  }
};

export default RoomPage;
