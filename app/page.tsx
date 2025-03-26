"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [tone, setTone] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  const handleGenerateCaption = () => {
    // Placeholder for caption generation functionality
    console.log("Generating caption with:", { image, tone, description })
    // Here you would typically call an API to generate the caption
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* App Bar */}
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Captify</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-6 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-8 text-center">Image Caption Generator</h1>

        <div className="space-y-8 w-full">
          {/* Step 1: Upload Image */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">1. Upload an Image</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full flex flex-col items-center justify-center">
              {image ? (
                <div className="relative w-full max-w-xs aspect-square mb-4">
                  <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-contain" />
                </div>
              ) : (
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">Click to upload an image</p>
                </label>
              )}

              <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleFileChange} />

              {image && (
                <button onClick={() => setImage(null)} className="mt-4 text-sm text-primary hover:underline">
                  Upload a different image
                </button>
              )}
            </div>
          </div>

          {/* Step 2: Select Tone */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">2. Select a tone of image</h2>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Step 3: Additional Description */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">3. Add Additional Description (Optional)</h2>
            <Textarea
              placeholder="Enter any additional details about the image..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Generate Button */}
          <Button className="w-full py-6 text-lg" size="lg" onClick={handleGenerateCaption} disabled={!image}>
            Convert image to captions
          </Button>
        </div>git 
      </div>
    </main>
  )
}
