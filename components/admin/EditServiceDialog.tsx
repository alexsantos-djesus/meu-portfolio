"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditServiceDialog({
  service,
  onAction,
}: {
  service: any;
  onAction: (fd: FormData) => void;
}) {
  const ref = React.useRef<HTMLFormElement>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <form ref={ref} action={onAction} className="space-y-3">
          <input type="hidden" name="id" defaultValue={service.id} />
          <input
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2"
            name="title"
            defaultValue={service.title}
            placeholder="Título"
          />
          <textarea
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2"
            name="shortDesc"
            defaultValue={service.shortDesc}
            placeholder="Descrição curta"
          />
          <textarea
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2"
            name="longDesc"
            defaultValue={service.longDesc}
            placeholder="Descrição longa"
          />
          <input
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2"
            name="baseStack"
            defaultValue={service.baseStack.join(", ")}
            placeholder="Stack base (separado por vírgula)"
          />
          <input
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2"
            name="features"
            defaultValue={service.features.join(" | ")}
            placeholder="Features (separe por |)"
          />
          <input
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2"
            name="ctaWhatsapp"
            defaultValue={service.ctaWhatsapp}
            placeholder="Texto do CTA WhatsApp"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={service.isActive}
              value="true"
            />{" "}
            Ativo
          </label>
          <div className="flex gap-2 justify-end">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
