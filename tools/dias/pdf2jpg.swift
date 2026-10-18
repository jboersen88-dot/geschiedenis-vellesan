import Foundation
import PDFKit
import AppKit
let args = CommandLine.arguments
let pdf = PDFDocument(url: URL(fileURLWithPath: args[1]))!
let outDir = args[2]; let width = CGFloat(Double(args[3]) ?? 1600)
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)
for i in 0..<pdf.pageCount {
  let page = pdf.page(at: i)!
  let box = page.bounds(for: .mediaBox)
  let scale = width / box.width
  let size = NSSize(width: box.width*scale, height: box.height*scale)
  let img = NSImage(size: size)
  img.lockFocus()
  NSColor.white.setFill(); NSRect(origin: .zero, size: size).fill()
  let ctx = NSGraphicsContext.current!.cgContext
  ctx.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: ctx)
  img.unlockFocus()
  let rep = NSBitmapImageRep(data: img.tiffRepresentation!)!
  let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.72])!
  try! data.write(to: URL(fileURLWithPath: String(format: "%@/%02d.jpg", outDir, i+1)))
}
print(pdf.pageCount)
