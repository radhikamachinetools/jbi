// lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function getAuthHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
  };
}

// Fetch all products
export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Create a new product
export async function createProduct(data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

// Update an existing product
export async function updateProduct(id: string, data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

// Delete a product
export async function deleteProduct(id: string) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

export async function deleteMedia(id: string) {
  const res = await fetch(`${API_URL}/api/media/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete media");
  return res.json();
}

export async function uploadFiles(files: File[], slug: string) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("slug", slug);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload files");
  return res.json();
}

export async function getMedia() {
  const res = await fetch(`${API_URL}/api/media`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
}
