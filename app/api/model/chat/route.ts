import { ModelType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const data = await prisma.chat.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tradings: true,
    },
    take: 20,
  });

  return Response.json({
    data: data.map((item: any) => ({
      ...item,
      model: item.model || ModelType.Qwen,
    })),
  });
};