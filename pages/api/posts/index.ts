import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body, imageUrl } = req.body;

      console.log("Received body:", body);
      console.log("Received imageUrl:", imageUrl);

      // Validate if either body or imageUrl is present
      if (!body && !imageUrl) {
        return res.status(400).json({ message: "Body or imageUrl is required" });
      }

      const post = await prisma.post.create({
        data: {
          body,
          imageUrl, // Add imageUrl to the post
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId: userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }

  } catch (error) {
    console.error("Error in API handler:", error); // Log the actual error
    return res.status(400).json({ message: "Something went wrong" });
  }
}
