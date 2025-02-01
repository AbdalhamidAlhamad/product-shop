import { Order } from "entites";
import axios from "axios";
export class ThirdPartyService {
  public static async PostOrder(order: Order): Promise<any> {
    const data = order;
    const baseUrl = process.env.THIRD_PARTY_API_URL;
    const apiKey = process.env.THIRD_PARTY_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error("Third party API URL or API Key is not provided");
    }

    try {
      await axios.post(baseUrl, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      });
    } catch (error) {
      throw new Error("Failed to send order to third party API");
    }
  }
}
