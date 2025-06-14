import { insertJSON } from "../services/insert";

export const insertData = async (req, res) => {
  try {
    const respone = await insertJSON();
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({ error: "Lỗi server" });
  }
};
