import { CONTEXT_MESSAGE } from '../constants/contextMessageMapping'
import { getContextByValue } from '../services/database/context'
import { CacheInstance } from '../services/cache'

export const getMessageReply = async (
  services: {
    database: { getContextByValue: typeof getContextByValue }
    cache: CacheInstance
  },
  input: {
    conversation_id: string
    message: string
  }
) => {
  const existingData = services.cache.get(input.message)
  if (existingData) {
    return {
      reply_id: input.conversation_id,
      message: existingData,
    }
  }

  const wordList = ['hello', 'hi', 'goodbye', 'bye']
  let context = 'NO_CONTEXT'
  for (let word of input.message.split(' ')) {
    const trimmed = word.toLowerCase().trim()
    if (!wordList.includes(trimmed)) continue
    const contextValue = await getContextByValue(trimmed)
    if (contextValue) {
      context = contextValue
      break
    }
  }

  let message = ''
  if (context === 'NO_CONTEXT' || context === 'GREETING' || context === 'END') {
    message = CONTEXT_MESSAGE[context]
  }

  services.cache.insert(input.message, message)

  return {
    reply_id: input.conversation_id,
    message,
  }
}
