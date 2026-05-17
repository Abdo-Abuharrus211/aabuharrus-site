import { writable } from "svelte/store";
import type { Project } from "../types/types"

// type ProjectEntry = { id: number; data: Project };

export const selectedProject = writable<Project | null>(null);
export const showModal = writable(false);

export function openModal(proj: Project) {
    showModal.set(true);
    selectedProject.set(proj);
}

export function closeModal() {
    showModal.set(false);
    selectedProject.set(null);

}

export const projModalStore = {
    selectedProject,
    showModal,
    openModal,
    closeModal,
};


