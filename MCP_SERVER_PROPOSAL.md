# MCP Server Proposal — Submodule Capabilities

> Evaluation of 201 submodules for exposure as [Model Context Protocol](https://modelcontextprotocol.io/) servers.  
> Generated 2026-03-13 from `_model_links.json` scan data.

## Overview

| Metric | Count |
|--------|-------|
| Total submodules | 201 |
| Viable MCP candidates | 65 |
| MCP framework available | `fastmcp` + `python-sdk` (both in submodules) |
| Build priority phases | 4 |

MCP servers expose **tools** that AI assistants can call over stdio/SSE.
Each candidate below lists the submodule, proposed tool names, and priority.

---

## Phase 1 — Core Intelligence (highest utility)

### 1.1 LLM Inference

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `llama.cpp` | C/C++ LLM inference, already has REST server | `llm_complete(prompt, model, params)`, `llm_chat(messages, model)`, `llm_embed(text)` | **HIGH** |
| `ollama` | Local LLM runner with model management | `ollama_generate(prompt, model)`, `ollama_chat(messages, model)`, `ollama_list()`, `ollama_pull(model)` | **HIGH** |
| `sglang` | High-perf LLM serving (5× faster than vLLM) | `sglang_generate(prompt, params)`, `sglang_structured_output(prompt, json_schema)` | **HIGH** |
| `lmdeploy` | LLM deployment with quantization | `lmdeploy_infer(prompt, model)`, `lmdeploy_batch(prompts)` | MEDIUM |

### 1.2 Speech Recognition

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `whisper` | OpenAI speech recognition (Python) | `whisper_transcribe(audio, language?)`, `whisper_translate(audio)`, `whisper_detect_language(audio)` | **HIGH** |
| `whisper.cpp` | High-perf C++ Whisper inference | `whispercpp_transcribe(audio)` — lower resource usage | **HIGH** |

### 1.3 Document & Visual Understanding

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `GLM-OCR` | 0.9B OCR for complex documents | `glm_ocr_extract(image)`, `glm_ocr_table(image)`, `glm_ocr_formula(image)` | **HIGH** |
| `Qwen3-VL` | Vision-language model (GUI agent capable) | `qwen3vl_describe(image)`, `qwen3vl_qa(image, question)`, `qwen3vl_ground(image, text)` | **HIGH** |
| `Qwen3-Omni` | Omni-modal (text/image/audio/video) | `qwen_omni_understand(input)`, `qwen_omni_speak(text)` | **HIGH** |

### 1.4 RAG & Search

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `UltraRAG` | Full RAG pipeline | `ultrarag_ingest(documents)`, `ultrarag_query(question)`, `ultrarag_search(query)` | **HIGH** |
| `langchain` | LLM application framework | `langchain_chain(spec)`, `langchain_qa(docs, question)`, `langchain_summarize(text)` | **HIGH** |
| `MindSearch` | Deep multi-step AI search | `mindsearch_search(query)` | **HIGH** |

### 1.5 Browser Automation

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `playwright-python` | Browser automation (Chromium/FF/WebKit) | `playwright_screenshot(url)`, `playwright_scrape(url, selector)`, `playwright_pdf(url)` | **HIGH** |

---

## Phase 2 — Creative Generation

### 2.1 Video Generation

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `LTX-2` | Synced audio+video DiT model | `ltx2_text2video(prompt)`, `ltx2_img2video(image, prompt)`, `ltx2_upscale(video)` | **HIGH** |
| `HunyuanVideo` | Tencent large-scale video gen | `hunyuan_generate(prompt)`, `hunyuan_img2video(image, prompt)` | **HIGH** |
| `CogVideo` | CogVideoX text/image to video | `cogvideo_generate(prompt)`, `cogvideo_img2video(image, prompt)` | **HIGH** |
| `Helios` | Real-time 14B video (19.5 FPS on H100) | `helios_realtime_video(prompt)` | MEDIUM |
| `Wan2GP` | Multi-model video gen UI | `wangp_generate(prompt, model)` | MEDIUM |
| `Stable-Video-Infinity` | Infinite-length video | `svi_extend(video, prompt)` | MEDIUM |
| `Kiwi-Edit` | Instruction-based video editing | `kiwi_edit(video, instruction)`, `kiwi_edit_ref(video, ref_image, instruction)` | MEDIUM |
| `FastVMT` | Video motion transfer (3.4× speedup) | `fastvmt_transfer(source, ref, prompt)` | LOW |
| `DreamID-V` | Face swap in video via DiT | `dreamidv_swap(video, face_image)` | LOW |
| `OmnimatteZero` | Training-free video matting | `omnimatte_remove(video, mask)`, `omnimatte_extract(video, mask)` | MEDIUM |

### 2.2 Image Generation

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `stable-diffusion-webui` | SD with full feature set | `sd_txt2img(prompt, params)`, `sd_img2img(image, prompt)`, `sd_inpaint(image, mask, prompt)` | **HIGH** |
| `ComfyUI` | Node-based visual AI pipeline | `comfy_run_workflow(workflow_json)`, `comfy_txt2img(prompt)` | **HIGH** |
| `Z-Image` | 6B efficient image gen (sub-second) | `zimage_generate(prompt, style)`, `zimage_edit(image, instruction)` | **HIGH** |
| `Qwen-Image` | 20B image model with text rendering | `qwen_img_generate(prompt)`, `qwen_img_edit(image, instruction)` | MEDIUM |
| `IC-Light` | Image relighting | `iclight_relight(image, prompt)`, `iclight_relight_bg(image, bg_image)` | MEDIUM |
| `HiFi-Inpaint` | Reference-based inpainting | `hifi_inpaint(image, reference, mask)` | MEDIUM |

### 2.3 Audio & Speech Generation

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `AudioX` | Unified anything-to-audio | `audiox_text2audio(prompt)`, `audiox_text2music(prompt)`, `audiox_video2audio(video)` | **HIGH** |
| `ComfyUI-Qwen-TTS` | Qwen3-based TTS with voice cloning | `qwen_tts_speak(text, voice)`, `qwen_tts_clone(audio, text)` | **HIGH** |
| `VoxCPM` | Tokenizer-free TTS | `voxcpm_tts(text)`, `voxcpm_clone(ref_audio, text)` | MEDIUM |

### 2.4 Code Generation

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `Qwen3-Coder` | SOTA coding LLM with FIM | `qwen_code_complete(prefix, suffix)`, `qwen_code_generate(spec)`, `qwen_code_review(code)` | **HIGH** |
| `AlchemistCoder` | Code LLM tuned on multi-source data | `alchemist_code(prompt)`, `alchemist_explain(code)` | MEDIUM |
| `JanusCoder` | Visual code intelligence (chart-to-code) | `janus_chart_to_code(image)`, `janus_ui_generate(desc)` | MEDIUM |
| `CUDA-Agent` | RL-trained CUDA kernel generator | `cuda_generate_kernel(pytorch_code)` | MEDIUM |

---

## Phase 3 — Agents & Orchestration

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `crewAI` | Multi-AI agent orchestration | `crewai_run(crew_config)` | **HIGH** |
| `camel` | Multi-agent role-playing | `camel_roleplay(task, roles)` | MEDIUM |
| `owl` | OWL multi-agent task automation | `owl_automate(task)` | MEDIUM |
| `ChatDev` | Zero-code multi-agent dev | `chatdev_develop(requirement)` | MEDIUM |
| `SWE-agent` | Autonomous GitHub issue fixer | `swe_agent_fix(repo, issue)` | MEDIUM |
| `mini-swe-agent` | Minimal 100-line SWE agent | `mini_swe_fix(repo, issue)` | MEDIUM |
| `Qwen-Agent` | Browser + code interpreter agent | `qwen_agent_browse(url, task)`, `qwen_agent_code(task)` | MEDIUM |
| `agentlego` | Extensible tool APIs for LLM agents | `agentlego_use_tool(tool_name, args)` | MEDIUM |
| `gpt-engineer` | NL to full codebase | `gpt_eng_generate(spec)` | MEDIUM |

---

## Phase 4 — Specialized

### 4.1 Math & Reasoning

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `InternLM-Math` | Math reasoning + Lean theorem proving | `internlm_math_solve(problem)`, `internlm_math_prove(theorem)` | MEDIUM |

### 4.2 3D & Point Cloud

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `tttLRM` | Test-time 3D reconstruction | `tttlrm_reconstruct(images)`, `tttlrm_generate(image)` | MEDIUM |
| `Utonia` | Universal 3D point cloud encoder | `utonia_encode(point_cloud)` | LOW |
| `FreeCAD` | Parametric 3D CAD | `freecad_generate(script)` | LOW |

### 4.3 Video Tracking & Analysis

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `Track4World` | Dense 3D tracking | `track4world_track(video)` | LOW |

### 4.4 Music Pipeline

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `audiveris` | Optical Music Recognition | `audiveris_omr(sheet_image)` — sheet music to MusicXML | MEDIUM |
| `ggp-midi-to-musicxml` | Algorithmic MIDI orchestration | `midi2orch_orchestrate(midi, style)` | MEDIUM |
| `MuseScore` | Music notation & composition | `musescore_render(musicxml)`, `musescore_export(score, format)` | MEDIUM |

### 4.5 Training & Fine-Tuning

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `ai-toolkit` | All-in-one diffusion training (LoRA) | `aitk_train_lora(config)`, `aitk_status()` | MEDIUM |

### 4.6 Aesthetic Scoring

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `improved-aesthetic-predictor` | CLIP-based aesthetic scorer | `aesthetic_score(image)` | MEDIUM |

### 4.7 Documents

| Submodule | Description | Proposed Tools | Priority |
|-----------|-------------|----------------|----------|
| `markdown-to-pdf` | Markdown to formatted PDF | `md2pdf_convert(markdown)` | MEDIUM |

---

## Infrastructure

| Submodule | Role |
|-----------|------|
| `fastmcp` | **MCP server framework** — use to build all servers |
| `python-sdk` | **Official MCP Python SDK** — protocol implementation |
| `ggp-mcp-agent` | MCP client for Synology NAS with security guardrails |
| `fastapi` | HTTP framework for REST-based server variants |
| `openai-python` | OpenAI API client for hybrid inference |
| `terraform-ggp` | AWS infra for remote deployment |
| `ollama-fargate` | Ollama on AWS Fargate for cloud inference |

---

## Implementation Pattern

Each MCP server follows this pattern using `fastmcp`:

```python
from fastmcp import FastMCP

mcp = FastMCP("server-name")

@mcp.tool()
def tool_name(param: str) -> str:
    """Tool description."""
    # Call underlying model/library
    return result

if __name__ == "__main__":
    mcp.run()
```

Servers run as stdio processes launched by the MCP client (VS Code, Claude Desktop, etc.).
Model weights are fetched from `s3://ggp-models` via the existing `ModelManager` in `ggp-studio`.

### Recommended server layout

```
guidogerb/
  mcp-servers/
    llm-inference/        # llama.cpp / ollama / sglang wrapper
    speech/               # whisper transcription + TTS
    vision/               # OCR, VL understanding, aesthetic scoring
    image-gen/            # SD, ComfyUI, Z-Image
    video-gen/            # LTX-2, HunyuanVideo, CogVideo
    audio-gen/            # AudioX, Qwen-TTS
    code-gen/             # Qwen3-Coder, AlchemistCoder
    rag/                  # UltraRAG, langchain
    browser/              # playwright automation
    agents/               # crewAI, SWE-agent orchestration
    math/                 # InternLM-Math
    music/                # audiveris → orchestration → MuseScore
    documents/            # markdown-to-pdf, document processing
```

---

## Non-viable Submodules (136)

Static content, UI themes, configs, web apps, data repos, or too infrastructure-specific:
`7digital-api`, `ampache`, `amplify-js`, `amplify-ui`, `awesome-cursorrules`, `awesome-python`,
`blacklist-hosts`, `blender-*` (5), `blockchainvoting`, `bridge-gapp`, `configurator`,
`diloco_simple`, `ffmpeg-custom`, `garygerber-website`, `ggp-design-system`, `ggp-python-project`,
`ggp-react-project`, `ggp-studio`, `graffiti-monkey`, `guidogerb-*` (3), `hedgedoc`, `HY-WU`,
`langchain-ts-starter`, `localStorage`, `matrix.to`, `mediawiki-bootstrap`, `MSongsDB`,
`musicbrainz-*`, `nopaste`, `open-llms` (data only), `OpenDiloco`, `penpot`, `portal-client`,
`saleor*` (3), `sgl-*` (4 doc repos), `storefront`, `zenphoto`, and others.
