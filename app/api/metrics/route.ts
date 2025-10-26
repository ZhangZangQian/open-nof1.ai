import { ModelType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const model = searchParams.get("model");

  let metrics = await prisma.metrics.findFirst({
    where: {
      model: model ? (model as ModelType) : ModelType.Qwen,
    },
  });

  if (!metrics) {
    metrics = await prisma.metrics.create({
      data: {
        name: "20-seconds-metrics",
        metrics: [],
        model: model ? (model as ModelType) : ModelType.Qwen,
      },
    });
  }

  return Response.json({
    data: metrics,
  });
};

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const model = searchParams.get("model");
  const { metrics: newMetrics } = await request.json();

  let metrics = await prisma.metrics.findFirst({
    where: {
      model: model ? (model as ModelType) : ModelType.Qwen,
    },
  });

  if (!metrics) {
    metrics = await prisma.metrics.create({
      data: {
        name: "20-seconds-metrics",
        metrics: newMetrics,
        model: model ? (model as ModelType) : ModelType.Qwen,
      },
    });
  } else {
    await prisma.metrics.update({
      where: {
        id: metrics.id,
      },
      data: {
        metrics: newMetrics,
      },
    });
  }

  return Response.json({
    data: metrics,
  });
};